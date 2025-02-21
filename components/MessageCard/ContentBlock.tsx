import {FC} from "react";

interface Props {
    content: string;
}

const ContentBlock:FC<Props> = ({ content }) => {
  return(
      <div className="m-4 bg-zinc-900 rounded-3xl">
          <div className="m-4 prose prose-invert break-words" dangerouslySetInnerHTML={{__html: content}}/>
      </div>
  )
}

export default ContentBlock;