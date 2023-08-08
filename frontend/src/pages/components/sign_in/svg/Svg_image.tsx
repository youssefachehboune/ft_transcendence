interface colorProp {
	color: boolean;
	setColor: (color: boolean) => void;
  }
  
  const Svg_image = (props: colorProp) => {
	function changeValueColorTrue() {
	  props.setColor(true);
	}
	function changeValueColorFalse() {
	  props.setColor(false);
	}
  
	return (
	  <div onMouseLeave={changeValueColorFalse} onMouseEnter={changeValueColorTrue} >
		<svg
		  viewBox="0 0 837 1117"
		  fill="none"
		  xmlns="http://www.w3.org/2000/svg"
		  className="svg_img select-none z-10000"
		>
		  <path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M76.8573 1117L91.811 1070.69C106.765 1024.38 136.672 929.904 141.657 837.284C146.641 744.664 126.703 652.043 91.811 557.57C55.2575 464.95 5.41176 372.33 0.427183 279.709C-4.55739 185.237 35.3192 92.6203 55.2575 46.3102L76.8573 -3.35954e-06L893 -3.90343e-05L893 46.3101C893 92.6203 893 185.24 893 279.713C893 372.333 893 464.954 893 557.574C893 652.046 893 744.667 893 837.287C893 929.907 893 1024.38 893 1070.69L893 1117L76.8573 1117Z"
			fill="#00DAEA"
		  />
		</svg>
	  </div>
	);
  };
  
  export default Svg_image;
  