import { delay, http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { isEmpty } from '../utils/object';

function searchParamsToJson(url) {
    const params = {};
    const searchParams = new URL(url).searchParams;
    return [...searchParams.keys()].filter(k => {
        return isEmpty(params[k]);
    }).map(key => {
        const value = searchParams.get(key);
        return { key, value};
    });
}

const data = new Array(faker.number.int({ min: 10, max: 1000 })).fill(0).map(() => ({
    id: faker.string.uuid().substring(0, 8),
    name: faker.person.fullName(),
    sex: faker.person.sex(),
    birthday: faker.date.birthdate().toISOString().substring(0, 10),
    country: faker.location.country(),
    rate: faker.number.int({ min: 0, max: 100 }),
}));

const handlers = [
    http.get('/api/dummy/401', async () => {
		return new HttpResponse(null, {
			status: 401,
		});
    }),
    http.get('/api/dummy', async ({ request }) => {
		await delay(Math.random() * 1500);
        const params = searchParamsToJson(request.url);

		const tmpData = data.slice().filter(d => {
            return params.reduce((res, p) => {
                if (!res) return res;
                const v = d[p.key];
                if (typeof(v) === 'string') return v.indexOf(p.value) > -1;
                if (typeof(v) === 'number') return +p.value && +p.value === v;
                else return v === p.value;
            }, true);
        });
		return HttpResponse.json(tmpData);
	}),
	http.post('/api/dummy', async ({ request }) => {
		await delay(Math.random() * 1500);
		const json = await request.json();

        const d = {...json, id: faker.string.uuid().substring(0, 8)};
        data.push(d);
        return HttpResponse.json(d);
	}),
    http.get('/api/dummy/:id', async ({ params }) => {
		await delay(Math.random() * 1500);
        return HttpResponse.json(data.find(d => d.id === params.id));
    }),
    http.put('/api/dummy/:id', async ({ params, request }) => {
		await delay(Math.random() * 1500);
		const json = await request.json();
        const d = data.find(d => d.id === params.id);
        if (!d) return HttpResponse(null, { status: 404 });
        Object.keys(json).forEach(k => {
            d[k] = json[k];
        });
        return HttpResponse.json(d);
    }),
    http.delete('/api/dummy/:id', async ({ params }) => {
		await delay(Math.random() * 1500);
        const idx = data.findIndex(d => d.id === params.id);
        if (idx < 0) return HttpResponse(null, { status: 404 });
        data.splice(idx, 1);
        return HttpResponse.json(null);
    }),
];
export default handlers;