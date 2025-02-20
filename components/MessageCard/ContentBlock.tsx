import {FC} from "react";

interface Props {
    content: string;
}

const ContentBlock:FC<Props> = ({ content }) => {
  return(
      <div className="ml-4">
          <div className="mt-4 mx-2 prose prose-invert" dangerouslySetInnerHTML={{__html: content}}/>
      </div>
  )
}

export default ContentBlock;