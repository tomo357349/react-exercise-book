import { useState } from 'react';
import Button from './components/Button.jsx';
import Input from './components/Input.jsx';
import TextInput from './components/TextInput.jsx';

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
        alert(JSON.stringify(form));
    }

	return (
        <>
            <h1>Hello World!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ullam commodi, natus dicta at nisi maxime tempora aspernatur modi, laboriosam, obcaecati repellat saepe quae. Exercitationem hic atque facilis enim consequuntur!</p>
            <form>
                <TextInput name="userid" value={form.userid} placeholder="ユーザID" onChange={handleChange} /><br />
                <Input type="password" name="password" value={form.password} placeholder="パスワード" onChange={handleChange} /><br />
                <Input type="date" name="birthdate" value={form.birthdate} placeholder="生年月日" onChange={handleChange} /><br />
                <Input type="number" name="grade" value={form.grade} placeholder="グレード" onChange={handleChange} /><br />
                <Input type="checkbox" name="isadmin" value={form.isadmin} onChange={handleChange} /><br />
                <Button type="button" onClick={handleRun}>実行</Button>
            </form>
            <h2>Disabled</h2>
            <form>
                <TextInput name="txt1" disabled placeholder="ユーザID" value="abc123" /><br />
                <Input type="checkbox" name="chk1" value={false} disabled /><br />
                <Input type="checkbox" name="chk2" value={true} disabled /><br />
                <Button type="button" disabled>実行</Button>
            </form>
            <h2>Button Colors</h2>
            <form>
                <Button type="button">Primary</Button>
                <Button type="button" face="secondary">Secondary</Button>
                <Button type="button" face="assertive">Assertive</Button>
                <Button type="button" face="clear">Clear</Button>
            </form>
        </>
    );
}
