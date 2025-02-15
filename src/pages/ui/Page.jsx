import { useState } from 'react';
import Form from '../../components/Form.jsx';
import Button from '../../components/Button.jsx';
import ButtonControl from '../../components/ButtonControl.jsx';
import Input from '../../components/Input.jsx';
import InputControl from '../../components/InputControl.jsx';
import useFetch from '../../hooks/useFetch.js';
import TagControl from '../../components/TagLabelControl.jsx';
import LabelControl from '../../components/LabelControl.jsx';
import Icon from '../../components/Icon.jsx';
import MultiLineInputControl from '../../components/MultiLineInputControl.jsx';
import SelectControl from '../../components/SelectControl.jsx';
import Accordion from '../../components/Accordion.jsx';
import PageDialog from '../../PageDialog.jsx';
import InputAssistControl from '../../components/InputAssistConrol.jsx';

export default function Page() {
    const { data, isFetching, fetchNext } = useFetch('/api/dummy');

    const [form, setForm] = useState({
        userid: '',
        password: '',
        birthdate: '',
        sex: '',
        grade: 0,
        rate: 0,
        code: '',
        isadmin: false,
    });

    const { data: codeList } = useFetch('/api/country');

    const selectedCode = codeList && codeList.find(d => d.value === form.code);
    
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

    return (
        <>
            <h1>UI</h1>
            <h1>Hello World!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <Icon name="user" face="secondary" /> Consectetur ullam commodi, natus dicta at nisi maxime tempora aspernatur modi, laboriosam, obcaecati repellat saepe quae. Exercitationem hic atque facilis enim consequuntur!</p>
            <Accordion title="フォームコンポーネント" open>
                <Form onSubmit={handleRun}>
                    <InputControl icon="user" required autoFocus name="userid" value={form.userid} label="ユーザID" placeholder="ユーザID" onChange={handleChange} pattern="^[a-z]+$" componentSize="6chars" />
                    <InputControl icon="lock" type="password" name="password" value={form.password} label="パスワード" placeholder="パスワード" onChange={handleChange} minLength="6" componentSize="8chars" />
                    <LabelControl value="あああ" />
                    <InputControl type="date" name="birthdate" value={form.birthdate} label="生年月日" placeholder="生年月日" onChange={handleChange} />
                    <SelectControl name="sex" value={form.sex} label="性別" placeholder="性別" onChange={handleChange} options={[
                        { label: '', value: '' },
                        { label: '男性', value: 'm' },
                        { label: '女性', value: 'f' },
                    ]} />
                    <InputControl type="number" name="grade" value={form.grade} label="グレード" placeholder="グレード" onChange={handleChange} componentSize="3chars" />
                    <InputControl type="checkbox" name="isadmin" value={form.isadmin} label="管理者" onChange={handleChange} />
                    <TagControl name="rate" tag={form.rate} label="正答率" face={form.rate <= 30 ? 'assertive' : 'positive'} onClick={handleClickRate} />
                    <TagControl name="rate" tag={<Icon name="user" />} /><br />
                    <InputAssistControl name="code" value={form.code} label="コード" list={codeList} onChange={handleChange} componentSize="4chars" />
                    <LabelControl value={selectedCode ? selectedCode.desc : ''} />
                    <div className="form-control-wrapper">
                        <div className="form-control">
                            <input type="text" list="code" value={form.code} onInput={(evt) => handleChange(evt.target.value, 'code')} />
                            <label>（比較用）Web標準のdataList</label>
                            <datalist id="code">
                                {codeList && codeList.map(d => (
                                    <option key={d.value} value={d.value}>{d.desc}</option>
                                ))}
                            </datalist>
                        </div>
                    </div>
                    <br />
                    <MultiLineInputControl name="desc" label="説明" rows="2" /><br />
                    <ButtonControl icon="check" type="submit">実行</ButtonControl>
                    {isFetching && <div>検索中.. <span className="loader"></span></div>}
                    <LabelControl value={data && data.length} />
                </Form>
            </Accordion>
            <Accordion title="非活性のフォームコンポーネント">
                <form>
                    <Input name="txt1" disabled placeholder="ユーザID" value="abc123" />
                    <Input type="checkbox" name="chk1" value={false} disabled />
                    <Input type="checkbox" name="chk2" value={true} disabled />
                    <Button type="button" disabled>実行</Button>
                </form>
            </Accordion>
            <Accordion title="ボタンのバリエーション">
                <form>
                    <Button type="button">Primary</Button>
                    <Button type="button" face="secondary">Secondary</Button>
                    <Button type="button" face="assertive">Assertive</Button>
                    <Button type="button" face="clear">Clear</Button>
                </form>
            </Accordion>
            <PageDialog />
        </>
    );
}