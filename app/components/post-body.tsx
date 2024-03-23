import ReactMarkdown from 'react-markdown';

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="prose">
      <ReactMarkdown className="prose">{content}</ReactMarkdown>
    </div>
  );
}
