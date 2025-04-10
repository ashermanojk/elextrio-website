'use client';

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, height = 400, placeholder = '' }: RichTextEditorProps) {
  const editorRef = useRef<any>(null);
  
  if (!process.env.NEXT_PUBLIC_TINYMCE_API_KEY) {
    throw new Error('NEXT_PUBLIC_TINYMCE_API_KEY is not defined. Please add it to your .env.local file.');
  }
  
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(_, editor) => editorRef.current = editor}
      initialValue={value}
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      init={{
        height,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        placeholder,
        browser_spellcheck: true,
        skin: 'oxide',
        convert_urls: false,
        entity_encoding: 'raw',
        min_height: 200,
        resize: true,
        branding: false,
        paste_data_images: true,
        setup: (editor: any) => {
          editor.on('init', () => {
            if (!value) editor.setContent('');
          });
        }
      }}
    />
  );
}
