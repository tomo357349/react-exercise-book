import { useCallback, useMemo, useState } from 'react';
import Form from '../../components/Form.jsx';
import ButtonControl from '../../components/ButtonControl.jsx';
import InputControl from '../../components/InputControl.jsx';
import DataTable from '../../components/DataTable.jsx';
import fetchData from '../../utils/fetch.js';
import TagLabel from '../../components/TagLabel.jsx';
import SelectControl from '../../components/SelectControl.jsx';
import useTitle from '../../hooks/useTitle.js';

export default function Page() {
    useTitle('検索・登録');
    const [registerForm, setRegisterForm] = useState({
        id: '',
        name: '',
        sex: '',
        birtyday: '',
        country: '',
        rate: '',
    });
    const [searchForm, setSearchForm] = useState({
        name: '',
        sex: '',
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
        <>
            <h2>登録フォーム</h2>
            <Form onSubmit={handleRegister}>
                <InputControl readOnly label="ID" name="id" value={registerForm.id} onChange={handleChangeRegisterForm} />
                <InputControl label="氏名" name="name" value={registerForm.name} onChange={handleChangeRegisterForm} />
                <InputControl label="出身国" name="country" value={registerForm.country} onChange={handleChangeRegisterForm} />
                <SelectControl label="性別" name="sex" value={registerForm.sex} onChange={handleChangeRegisterForm} options={[
                    { label: '', value: '' },
                    { label: '男性', value: 'male' },
                    { label: '女性', value: 'female' }
                ]} />
                <ButtonControl type="submit">登録</ButtonControl>
                <ButtonControl type="button" face="assertive" onClick={handleDelete}>削除</ButtonControl>
                <ButtonControl type="button" face="clear" onClick={handleClear}>クリア</ButtonControl>
            </Form>
            <h2>検索フォーム</h2>
            <Form onSubmit={handleSearch}>
                <InputControl label="氏名" name="name" value={searchForm.name} onChange={handleChangeSearchForm} />
                <InputControl label="出身国" name="country" value={searchForm.country} onChange={handleChangeSearchForm} />
                <SelectControl label="性別" name="sex" value={searchForm.sex} onChange={handleChangeSearchForm} options={[
                    { label: '', value: '' },
                    { label: '男性', value: 'male' },
                    { label: '女性', value: 'female' }
                ]} />
                <ButtonControl type="submit">検索</ButtonControl>
            </Form>
            {searchResult && <DataTable data={searchResult} columns={columns} />}
        </>
    );
}
