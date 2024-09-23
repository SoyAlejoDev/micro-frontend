import { Data } from "../../../types";
import { Characteristics_Items } from "./Characteristics_Items";

interface Props {
  socketData: Data | null;
}


export const Characteristics = ({ socketData }: Props) => {
  return (
    <div className='md:flex md:items-center md:justify-around md:h-[60vh]'>

      {
        socketData?.characteristics.map((item, index) => (
          <Characteristics_Items
            key={index}
            characteristics={item}
          />
        ))
      }

    </div>
  );
};
