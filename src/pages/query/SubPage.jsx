import ButtonControl from "../../components/ButtonControl";
import Form from "../../components/Form";
import InputControl from "../../components/InputControl";
import useQueryStringForm from "../../hooks/useQueryStringForm"

export default function SubPage() {
    console.log('SubPage');
    const [form, setForm, setQuery] = useQueryStringForm({ param1: '', param2: 0 });

    function handleInput(value, name) {
        setForm({...form, [name]: value});
    }

    function handleSubmit() {
        setQuery(form, true);
    }

    function handleUpdateParam1(evt) {
        evt.preventDefault();
        const nextForm = {...form, param1: 'abc'};
        // setForm(nextForm);
        setQuery(nextForm, true);
    }
    return (
        <>
            <h2>Sub (replace state)</h2>
            <Form onSubmit={handleSubmit}>
                    <InputControl name="param1" label="Param1" value={form.param1} onChange={handleInput} />
                    <InputControl type="number" name="param2" label="Param2" value={form.param2} onChange={handleInput} />
                    <ButtonControl type="submit">Submit</ButtonControl>
            </Form>
            <ul>
                <li><a onClick={handleUpdateParam1}>Update Param1=abc</a></li>
            </ul>
        </>
    )
}