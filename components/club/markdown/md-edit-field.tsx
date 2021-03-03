// @ts-nocheck
import { useField } from 'formik';
import React, { RefObject } from 'react';
import { AssetBasicFragment } from '../../../api/generated';
import { assetPath } from '../../../utils/asset';
import { AssetSelectDialog } from '../../assets/select-dialog';

const Editor =
  global.window && global.window.navigator
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@toast-ui/react-editor').Editor
    : () => null;

type Props = {
  name: string;
};
export const ClubMarkdownEditorField = ({ name }: Props) => {
  const [{ value }, , { setValue }] = useField(name);
  const [{ value: clubId }] = useField('id');
  const editorRef = React.useRef<unknown>() as RefObject<unknown>;
  const [assetOpen, setAssetOpen] = React.useState(false);

  const handleChange = React.useCallback(() => {
    const md: string = editorRef.current?.getInstance()?.getMarkdown();
    console.log(md);
    setValue(md ?? '');
  }, [editorRef]);

  React.useEffect(() => {
    try {
      const editor = editorRef.current?.getInstance();
      if (!editor) return;

      const toolbar = editor.getUI().getToolbar();
      const buttons = toolbar?.getItems();
      if (!toolbar || !buttons) return;

      if (editor.eventManager._hasEventType('clickImageButton')) return;

      let imageBtn = buttons.findIndex((btn) => btn.getName() === 'image');
      if (imageBtn >= 0) {
        toolbar.removeItem(imageBtn);
      } else {
        imageBtn = 10;
      }

      toolbar.insertItem(imageBtn, {
        type: 'button',
        options: {
          className: 'tui-image tui-toolbar-icons',
          event: 'clickImageButton',
          tooltip: 'Insert image',
        },
      });

      editor.eventManager.addEventType('clickImageButton');
      editor.eventManager.listen('clickImageButton', () => {
        setAssetOpen(true);
      });

      // こうするしかなかった
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
        onChange={handleChange}
        ref={editorRef}
        height='auto'
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
