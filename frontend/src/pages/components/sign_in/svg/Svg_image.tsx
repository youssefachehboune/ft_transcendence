

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
				<img src="Vector.svg" onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue} className="svg_img select-none" />
		</div>
	)
}

export default Svg_image;