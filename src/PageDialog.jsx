import { useState } from 'react';
import Button from './components/Button.jsx';
import ButtonControl from './components/ButtonControl.jsx';
import Dialog from './components/Dialog.jsx';
import Form from './components/Form.jsx';
import InputControl from './components/InputControl.jsx';
import useToast from './hooks/useToast.js';

export default function PageDialog() {
    const [isMessageShown, setIsMessageShown] = useState(false);
    const showToast = useToast();

    function showMessageDialog() {
        setIsMessageShown(true);
    }

    function handleCloseMessageDialog() {
        setIsMessageShown(false);
    }

    const [isFormShown, setIsFormShown] = useState(false);

    const [form, setForm] = useState({
        txt1: '',
        txt2: '',
        txt3: '',
    });

    function handleInputChange(value, name) {
        setForm(form => ({...form, [name]: value}));
    }

    function showFormDialog() {
        setIsFormShown(true);
    }

    function handleOkFormDialog() {
        alert(JSON.stringify(form, null, '\t'));
        setForm({ txt1: '', txt2: '', txt3: '' });
        setIsFormShown(false);
    }

    function handleCloseFormDialog() {
        setForm({ txt1: '', txt2: '', txt3: '' });
        setIsFormShown(false);
        showToast({
            message: 'キャンセルされました。',
            face: 'secondary',
            timeout: 1500,
        });
    }

    return (
        <>
            <h2>Dialog</h2>
            <form>
                <Button type="button" onClick={showMessageDialog}>Message Dialog</Button>
                <Button type="button" onClick={showFormDialog}>Form Dialog</Button>
            </form>
            {isMessageShown && <Dialog title="メッセージ" onClose={handleCloseMessageDialog}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ullam commodi, natus dicta at nisi maxime tempora aspernatur modi, laboriosam, obcaecati repellat saepe quae. Exercitationem hic atque facilis enim consequuntur!</Dialog>}
            {isFormShown && <Dialog title="フォーム" commands={<>
                    <ButtonControl type="button" onClick={handleOkFormDialog}>OK</ButtonControl>
                    <ButtonControl type="button" face="clear" onClick={handleCloseFormDialog}>キャンセル</ButtonControl>
                </>} onClose={handleCloseFormDialog} onAction={handleOkFormDialog}>
                <Form>
                    <InputControl label="テキスト1" name="txt1" value={form.txt1} onChange={handleInputChange} />
                    <InputControl label="テキスト2" name="txt2" value={form.txt2} onChange={handleInputChange} />
                    <InputControl label="テキスト3" name="txt3" value={form.txt3} onChange={handleInputChange} />
                </Form>
            </Dialog>}
        </>
    );
}