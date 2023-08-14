

interface colorProp {
    color: boolean;
    setColor : (color : boolean) => void;
  }

const  Rectangle = (props : colorProp) =>
{
	function changeValueColorTrue() {
		  props.setColor(true);
  }
  function changeValueColorFalse() {
		props.setColor(false);

	}
	return (
		<div>
				{/* left rectangles */}
				<div className="rectangele_left_border" onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue}></div>
				<div className="rectangele_left_one" onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue} ></div>
				<div className="rectangele_left_tow" onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue} ></div>
				<div className="rectangele_left_tree" onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue} ></div>
				{/* right rectangles */}
				<div className="rectangele_right_border"></div>
				<div className="rectangele_right_one"></div>
				<div className="rectangele_right_tow"></div>
				<div className="rectangele_right_tree"></div>
				<div className="rectangele_right_for"></div>
		</div>
	)
}

export default Rectangle;