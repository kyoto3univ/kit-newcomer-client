import { Editor, Viewer } from '@toast-ui/react-editor';
import { useField } from 'formik';
import React, { RefObject } from 'react';
import { AssetBasicFragment } from '../../../api/generated';
import { assetPath } from '../../../utils/asset';
import { AssetSelectDialog } from '../../assets/select-dialog';

const TOOLBAR_ITEMS = [
  'heading',
  'bold',
  'italic',
  'strike',
  'divider',
  'hr',
  'ul',
  'ol',
  'task',
  'divider',
  'table',
  {
    type: 'button',
    options: {
      className: 'tui-image tui-toolbar-icons',
      event: 'clickImageButton',
      tooltip: 'Insert image',
    },
  },
  'link',
  'divider',
  'quote',
  'code',
  'codeblock',
];
type Props = {
  name: string;
};
export const ClubMarkdownEditorField = ({ name }: Props) => {
  const [{ value }, , { setValue }] = useField(name);
  const [{ value: clubId }] = useField('id');
  const editorRef = React.useRef<Editor>() as RefObject<Editor>;
  const [assetOpen, setAssetOpen] = React.useState(false);

  const handleChange = React.useCallback(() => {
    const md = editorRef.current?.getInstance()?.getMarkdown() ?? '';
    setValue(md);
  }, [editorRef]);

  React.useEffect(() => {
    try {
      const editor = editorRef.current?.getInstance();
      if (!editor) return;

      const toolbar = editor.getUI().getToolbar();
      const buttons = toolbar?.getItems();
      if (!toolbar || !buttons) return;

      // @ts-ignore
      if (editor.eventManager._hasEventType('clickImageButton')) return;

      // @ts-ignore
      editor.eventManager.addEventType('clickImageButton');
      // @ts-ignore
      editor.eventManager.listen('clickImageButton', () => {
        setAssetOpen(true);
      });

      // こうするしかなかった
      // @ts-ignore
      editor.importManager._emitAddImageBlobHook = () => {
        console.log('noop');
      };
    } catch (e) {
      console.error(e);
    }
  }, [editorRef]);

  const handleAssetChosen = React.useCallback(
    (asset: AssetBasicFragment | null) => {
      setAssetOpen(false);

      if (!asset) return;

      try {
        const editor = editorRef.current?.getInstance();
        if (!editor) return;

        // @ts-ignore
        editor.eventManager.emit('command', 'AddImage', {
          imageUrl: assetPath(asset),
          altText: asset.alternativeDescription ?? 'image',
        });
      } catch (e) {
        console.error(e);
      }
    },
    [editorRef],
  );

  return (
    <div className='md-edit'>
      <Editor
        initialValue={value}
        initialEditType='wysiwyg'
        usageStatistics={false}
        // @ts-ignore
        onChange={handleChange}
        ref={editorRef}
        height='auto'
        toolbarItems={TOOLBAR_ITEMS}
      />
      <AssetSelectDialog
        clubId={clubId}
        onAssetUpdate={handleAssetChosen}
        onDismiss={() => setAssetOpen(false)}
        open={assetOpen}
      />
    </div>
  );
};

type RenderProps = {
  content: string;
};
export const MdRenderer = ({ content }: RenderProps) => {
  return <Viewer initialValue={content} />;
};
