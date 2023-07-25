interface colorProp {
    color: boolean;
    setColor : (color : boolean) => void;
  }
  
const  Svg_image = (props : colorProp) =>
{
		function changeValueColorTrue() {
				props.setColor(true);
		}
		function changeValueColorFalse() {

			  props.setColor(false);
  
		  }
	return(
		<div>
				<img src="Vector.svg" onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue} className="svg_img select-none z-10000" />
		</div>
	)
}

export default Svg_image;