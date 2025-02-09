import { useState } from 'react';
import Form from './components/Form.jsx';
import Button from './components/Button.jsx';
import ButtonControl from './components/ButtonControl.jsx';
import Input from './components/Input.jsx';
import InputControl from './components/InputControl.jsx';
import DataTable from './components/DataTable.jsx';
import { faker } from '@faker-js/faker';

const data = new Array(faker.number.int({ min: 10, max: 1000 })).fill(0).map(() => ({
    id: faker.string.uuid().substring(0, 8),
    name: faker.person.fullName(),
    sex: faker.person.sex(),
    birthday: faker.date.birthdate().toISOString().substring(0, 10),
    country: faker.location.country(),
    rate: faker.number.int({ min: 0, max: 100 }),
}));

const columns = [
    { field: 'id', label: 'ID', isKey: true, component: (d) => <a>{d.id}</a> },
    { field: 'name', label: '氏名', },
    { field: 'sex', label: '性別', },
    { field: 'birthday', label: '生年月日', },
    { field: 'country', label: '出身国', },
    { field: 'rate', label: '正答率', type: 'number' },
];

export default function App() {
    const [form, setForm] = useState({
        userid: '',
        password: '',
        birthdate: '',
        grade: 0,
        rate: 0,
        isadmin: false,
    });

    function handleChange(value, name) {
        setForm({...form, [name]: value});
    }

    function handleRun() {
        alert(JSON.stringify(form, null, '\t'));
    }

	return (
        <>
            <h1>Hello World!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ullam commodi, natus dicta at nisi maxime tempora aspernatur modi, laboriosam, obcaecati repellat saepe quae. Exercitationem hic atque facilis enim consequuntur!</p>
            <Form onSubmit={handleRun}>
                <InputControl required autoFocus name="userid" value={form.userid} label="ユーザID" placeholder="ユーザID" onChange={handleChange} pattern="^[a-z]+$" componentSize="6chars" />
                <InputControl type="password" name="password" value={form.password} label="パスワード" placeholder="パスワード" onChange={handleChange} minLength="6" componentSize="8chars" />
                <InputControl type="date" name="birthdate" value={form.birthdate} label="生年月日" placeholder="生年月日" onChange={handleChange} />
                <InputControl type="number" name="grade" value={form.grade} label="グレード" placeholder="グレード" onChange={handleChange} componentSize="3chars" />
                <InputControl type="checkbox" name="isadmin" value={form.isadmin} label="管理者" onChange={handleChange} />
                <ButtonControl type="submit">実行</ButtonControl>
            </Form>
            <h2>Disabled</h2>
            <form>
                <Input name="txt1" disabled placeholder="ユーザID" value="abc123" />
                <Input type="checkbox" name="chk1" value={false} disabled />
                <Input type="checkbox" name="chk2" value={true} disabled />
                <Button type="button" disabled>実行</Button>
            </form>
            <h2>Button Colors</h2>
            <form>
                <Button type="button">Primary</Button>
                <Button type="button" face="secondary">Secondary</Button>
                <Button type="button" face="assertive">Assertive</Button>
                <Button type="button" face="clear">Clear</Button>
            </form>
            <DataTable data={data} columns={columns} />
        </>
    );
}
