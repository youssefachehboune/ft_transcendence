import Link from 'next/link'
import { AiOutlineArrowRight } from "react-icons/ai";


export default function LeftSide() {
    return (
        <div className='doc1'>
            <div className='textHead'>
              <h1>Lorem Ipsum</h1>
              <div className='circleHead'></div>
            </div>
            <div className='textBody'>
              <p><span>Lorem Ipsum</span> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>
            <div className='lastbutton'>
              <Link href='#'><h1>Play now!</h1><AiOutlineArrowRight/></Link>
            </div>
          </div>
    );
}