import { useCallback, useMemo, useState } from 'react';
import Form from './components/Form.jsx';
import Button from './components/Button.jsx';
import ButtonControl from './components/ButtonControl.jsx';
import Input from './components/Input.jsx';
import InputControl from './components/InputControl.jsx';
import DataTable from './components/DataTable.jsx';
import fetchData from './utils/fetch.js';
import useFetch from './hooks/useFetch.js';
import PageDialog from './PageDialog.jsx';
import ToastContainer from './components/ToastContainer.jsx';
import TagLabel from './components/TagLabel.jsx';
import TagControl from './components/TagLabelControl.jsx';
import LabelControl from './components/LabelControl.jsx';

export default function App() {
    const [form, setForm] = useState({
        userid: '',
        password: '',
        birthdate: '',
        grade: 0,
        rate: 0,
        isadmin: false,
    });
    const { data, isFetching, fetchNext } = useFetch('/api/dummy');
    const [registerForm, setRegisterForm] = useState({
        id: '',
        name: '',
        birtyday: '',
        country: '',
        rate: '',
    });
    const [searchForm, setSearchForm] = useState({
        name: '',
        country: '',
    });
    const [searchResult, setSearchResult] = useState();

    const handleSelectResultItem = useCallback((evt, d) => {
        evt.preventDefault();
        setRegisterForm({...d});
    }, [setRegisterForm]);

    const columns = useMemo(() => [
        { field: 'id', label: 'ID', isKey: true, component: (d) => (
            <a onClick={(evt) => handleSelectResultItem(evt, d)}>{d.id}</a>
        ) },
        { field: 'name', label: '氏名', },
        { field: 'sex', label: '性別', component: (d) => (
            <TagLabel tag={d.sex} face={d.sex==='female' ? 'assertive' : 'primary'} />
        ) },
        { field: 'birthday', label: '生年月日', },
        { field: 'country', label: '出身国', },
        { field: 'rate', label: '正答率', type: 'number' },
    ], [handleSelectResultItem]);

    function handleChange(value, name) {
        setForm({...form, [name]: value});
    }

    function handleClickRate() {
        setForm(form => ({...form, rate: form.rate + 10}));
    }

    async function handleRun() {
        try {
            const nextData = await fetchNext('/api/dummy', form);
            alert(nextData.length);
        } catch (err) {
            console.error(err);
        }
    }

    function handleChangeRegisterForm(value, name) {
        setRegisterForm({...registerForm, [name]: value});
    }

    async function handleRegister() {
        const d = !registerForm.id ? await fetchData(`/api/dummy`, registerForm, { method: 'POST' })
            : await fetchData(`/api/dummy/${registerForm.id}`, registerForm, { method: 'PUT' });
        // 再検索せず、前の結果を更新する。
        setSearchResult(searchResult => {
            if (registerForm.id) {
                const nextResult = [...searchResult];
                const idx = nextResult.findIndex(r => r.id === registerForm.id);
                if (idx > -1) nextResult.splice(idx, 1, d);
                return nextResult;
            } else {
                const nextResult = searchResult ? [...searchResult, d] : [d];
                return nextResult;
            }
        });
        handleClear();
    }

    async function handleDelete() {
        await fetchData(`/api/dummy/${registerForm.id}`, null, { method: 'delete' });
        // 再検索せず、前の結果を更新する。
        setSearchResult(searchResult => searchResult.filter(r => r.id !== registerForm.id));
        handleClear();
    }

    function handleClear() {
        setRegisterForm({
            id: '',
            name: '',
            birtyday: '',
            country: '',
            rate: '',
        });
    }

    function handleChangeSearchForm(value, name) {
        setSearchForm({...searchForm, [name]: value});
    }

    async function handleSearch() {
        const nextResult = await fetchData('/api/dummy', searchForm);
        setSearchResult(nextResult);
    }

    return (
        <ToastContainer>
            <h1>Hello World!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ullam commodi, natus dicta at nisi maxime tempora aspernatur modi, laboriosam, obcaecati repellat saepe quae. Exercitationem hic atque facilis enim consequuntur!</p>
            <Form onSubmit={handleRun}>
                <InputControl required autoFocus name="userid" value={form.userid} label="ユーザID" placeholder="ユーザID" onChange={handleChange} pattern="^[a-z]+$" componentSize="6chars" />
                <InputControl type="password" name="password" value={form.password} label="パスワード" placeholder="パスワード" onChange={handleChange} minLength="6" componentSize="8chars" />
                <LabelControl value="あああ" />
                <InputControl type="date" name="birthdate" value={form.birthdate} label="生年月日" placeholder="生年月日" onChange={handleChange} />
                <InputControl type="number" name="grade" value={form.grade} label="グレード" placeholder="グレード" onChange={handleChange} componentSize="3chars" />
                <InputControl type="checkbox" name="isadmin" value={form.isadmin} label="管理者" onChange={handleChange} />
                <TagControl name="rate" tag={form.rate} label="正答率" face={form.rate <= 30 ? 'assertive' : 'positive'} onClick={handleClickRate} />
                <ButtonControl type="submit">実行</ButtonControl>
                {isFetching && <div>検索中.. <span className="loader"></span></div>}
                {data && data.length}<br />
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
            <PageDialog />
            <hr />
            <h2>登録フォーム</h2>
            <Form onSubmit={handleRegister}>
                <InputControl readOnly label="ID" name="id" value={registerForm.id} onChange={handleChangeRegisterForm} />
                <InputControl label="氏名" name="name" value={registerForm.name} onChange={handleChangeRegisterForm} />
                <InputControl label="出身国" name="country" value={registerForm.country} onChange={handleChangeRegisterForm} />
                <ButtonControl type="submit">登録</ButtonControl>
                <ButtonControl type="button" face="assertive" onClick={handleDelete}>削除</ButtonControl>
                <ButtonControl type="button" face="clear" onClick={handleClear}>クリア</ButtonControl>
            </Form>
            <h2>検索フォーム</h2>
            <Form onSubmit={handleSearch}>
                <InputControl label="氏名" name="name" value={searchForm.name} onChange={handleChangeSearchForm} />
                <InputControl label="出身国" name="country" value={searchForm.country} onChange={handleChangeSearchForm} />
                <ButtonControl type="submit">検索</ButtonControl>
            </Form>
            {searchResult && <DataTable data={searchResult} columns={columns} />}
        </ToastContainer>
    );
}
