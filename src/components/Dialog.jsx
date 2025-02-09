import DialogBackdrop from './DialogBackdrop.jsx';
import DialogContent from './DialogContent.jsx';
import DialogFooter from './DialogFooter.jsx';
import DialogHeader from './DialogHeader.jsx';
import DialogPopup from './DialogPopup.jsx';

/**
 * ダイアログコンポーネント
 */
export default function Dialog({ title, commands, children, onClose, onAction }) {
    return (
        <DialogBackdrop onClose={onClose} onAction={onAction}>
            <DialogPopup>
                {title && <DialogHeader title={title}></DialogHeader>}
                <DialogContent>
                    {children}
                </DialogContent>
                {commands && <DialogFooter>
                    {commands}
                </DialogFooter>}
            </DialogPopup>
        </DialogBackdrop>
    );
}