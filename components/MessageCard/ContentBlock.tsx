import {FC} from "react";

interface Props {
    content: string;
}

const ContentBlock:FC<Props> = ({ content }) => {
  return(
      <div className="ml-4 ">
          <div className="ml-2 prose" dangerouslySetInnerHTML={{__html: content}}/>
      </div>
  )
}

export default ContentBlock;