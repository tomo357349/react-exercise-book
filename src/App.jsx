import { useState } from 'react';
import Form from './components/Form.jsx';
import Button from './components/Button.jsx';
import ButtonControl from './components/ButtonControl.jsx';
import Input from './components/Input.jsx';
import InputControl from './components/InputControl.jsx';

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
        </>
    );
}
