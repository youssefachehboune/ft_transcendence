interface colorProp {
    color: boolean;
    setColor : (color : boolean) => void;
  }
  
const  Svg_image = (props : colorProp) =>
{
		function changeValueColorTrue() {
			  console.log('true');
				props.setColor(true);
		}
		function changeValueColorFalse() {
			  console.log('false');
			  props.setColor(false);
  
		  }
	return(
		<div>
				<img src="Vector.svg" className="svg_img" onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue} />
		</div>
	)
}

export default Svg_image;