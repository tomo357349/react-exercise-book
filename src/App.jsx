import { useState } from 'react';
import Button from './components/Button.jsx';
import TextInput from './components/TextInput.jsx';

export default function App() {
    const [txt1, setTxt1] = useState('');

    function handleChange(value) {
        setTxt1(value);
    }

    function handleRun() {
        alert(txt1);
    }

	return (
        <>
            <h1>Hello World!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ullam commodi, natus dicta at nisi maxime tempora aspernatur modi, laboriosam, obcaecati repellat saepe quae. Exercitationem hic atque facilis enim consequuntur!</p>
            <form>
                <TextInput value={txt1} placeholder="テキスト1" onChange={handleChange} /><br />
                <Button type="button" onClick={handleRun}>実行</Button>
            </form>
        </>
    );
}
