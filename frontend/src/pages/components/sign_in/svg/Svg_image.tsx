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
				<img src="Vector.svg" className="svg_img" onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue} />
		</div>
	)
}

export default Svg_image;