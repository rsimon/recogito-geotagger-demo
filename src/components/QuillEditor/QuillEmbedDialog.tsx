import { ReactNode, useMemo, useState } from 'react';
import type { Range } from 'quill';
import * as Dialog from '@radix-ui/react-dialog';
import { Image, Video } from '@phosphor-icons/react';
import type { Translations } from 'src/Types';
import { useQuillEditor } from './QuillEditorRoot';
import { parseYoutubeURL } from './quillEmbedUtils';

import './QuillEmbedDialog.css';

export interface QuillEmbedDialogProps {

  i18n: Translations;

  onClose(): void;

}

interface EmbedDialogProps {

  icon?: ReactNode;

  i18n: Translations;

  message?: string;

  placeholder?: string; 

  title: ReactNode;

  onSave(selection: Range, url: string): void;

  onCancel(): void;

}

export const EmbedLinkDialog = (props: QuillEmbedDialogProps) => {

  const { t } = props.i18n;

  const { quill } = useQuillEditor();

  const onSave = (range: Range, url: string) => {
    if (!quill) return; // Should never happen

    quill.formatText(range.index, range.length, 'link', url);
    quill.focus();  

    props.onClose();
  }

  return (
    <QuillEmbedDialog 
      i18n={props.i18n}
      title={t['Link']} 
      placeholder={t['Enter link']}
      onSave={onSave}
      onCancel={props.onClose} />
  )

}

export const EmbedImageDialog = (props: QuillEmbedDialogProps) => {

  const { t } = props.i18n;

  const { quill } = useQuillEditor();

  const onSave = (range: Range, url: string) => {
    if (!quill) return; // Should never happen

    quill.insertEmbed(range.index, 'image', url, 'user');
    quill.insertEmbed(range.index + 1, 'block', '<br><p><br></p>');
    quill.setSelection({ index: range.index + 1, length: 0 });
    window.setTimeout(() => quill.focus(), 100);

    props.onClose();
  }

  return (
    <QuillEmbedDialog 
      i18n={props.i18n}
      icon={<Image size={24} />} 
      title={t['Image']}
      message={t['Paste a publicly available URL to the image to insert it into your annotation.']}
      placeholder={t['Image URL']}
      onSave={onSave}
      onCancel={props.onClose}/>
  )

}

export const EmbedYouTubeDialog = (props: QuillEmbedDialogProps) => {

  const { t } = props.i18n;

  const { quill } = useQuillEditor();

  const onSave = (range: Range, url: string) => {
    if (!quill) return; // Should never happen

    const vetted = parseYoutubeURL(url);
    if (vetted) {
      quill.insertEmbed(range.index, 'video', vetted);
      quill.insertEmbed(range.index + 1, 'block', '<br><p><br></p>');
      quill.setSelection({ index: range.index + 1, length: 0 });
      quill.focus();
    }

    props.onClose();
  }

  return (
    <QuillEmbedDialog 
      i18n={props.i18n}
      icon={<Video size={24} />} 
      title={t['YouTube Video']}
      message={t['Paste a YouTube URL to embed the video into your annotation.']}
      placeholder={t['YouTube URL']}
      onSave={onSave} 
      onCancel={props.onClose} />
  )

}

const QuillEmbedDialog = (props: EmbedDialogProps) => {

  const [value, setValue] = useState('');

  const { quill } = useQuillEditor();

  const selection = useMemo(() => quill?.getSelection(), [quill]);

  const { t } = props.i18n;

  const onCancel = () => {
    props.onCancel();
    window.setTimeout(() => quill?.focus(), 1);
  }

  return selection && (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay not-annotatable" />
        
        <Dialog.Content className="dialog-content not-annotatable quill-embed-dialog">
          <Dialog.Title className='dialog-title'>
            {props.icon} {props.title}
          </Dialog.Title>
          
          {props.message && (
            <Dialog.Description className='dialog-description'>
              {props.message}
            </Dialog.Description>
          )}

          <input
            placeholder={props.placeholder}
            onChange={e => setValue(e.target.value)} />

          <div className="embed-dialog-actions">
            <button 
              onClick={onCancel}>
              {t['Cancel']}
            </button>

            <button 
              className="primary"
              onClick={() => props.onSave(selection, value)}>
              {t['Save']}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )

}