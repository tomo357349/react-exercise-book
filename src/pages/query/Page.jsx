import ButtonControl from '../../components/ButtonControl';
import Form from '../../components/Form.jsx';
import InputControl from '../../components/InputControl';
import NavLink from '../../components/NavLink';
import useQueryStringForm from '../../hooks/useQueryStringForm.js';
import SubPage from './SubPage.jsx';

export default function Page() {
    console.log('Page');
    const [form, setForm, setQuery] = useQueryStringForm({ key1: '', key2: 0, key3: false });

    function handleInput(value, name) {
        setForm({ ...form, [name]: value });
    }

    function handleSubmit() {
        setQuery(form);
    }

    return (
        <>
            <h1>Query</h1>
            <Form onSubmit={handleSubmit}>
                <InputControl name="key1" label="Key1" value={form.key1} onChange={handleInput} />
                <InputControl type="number" name="key2" label="Key2" value={form.key2} onChange={handleInput} />
                <InputControl type="checkbox" name="key3" label="Key3" value={form.key3} onChange={handleInput} />
                <ButtonControl type="submit">Submit</ButtonControl>
            </Form>
            <ul>
                <li><NavLink to="/query?key1=xxx">Set key1=xxx</NavLink></li>
                <li><NavLink to="/query?key2=123">Set key2=123</NavLink></li>
                <li><NavLink to="/query?key3=1">Set key3=true</NavLink></li>
            </ul>
            <SubPage />
        </>
    );
}