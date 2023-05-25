import React, { memo } from "react";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
export default memo(function Qrdiv({ qrCode, code, onTogle }) {
	const [showCode, setShowCode] = useState(false)
	const canvasRef = useRef();
	useEffect(() => {
		QRCode.toCanvas(
			canvasRef.current,
			qrCode || " ",
			(error) => error && console.error(error)
		);
	}, [qrCode]);
	return (
		<div
			className={`absolute right-1/2 translate-x-1/2 top-0 flex flex-col justify-center items-center  w-full h-screen bg-black opacity-90 shadow-md`}
		>
			<canvas className="qr" onClick={() => { onTogle() }} ref={canvasRef} />
			{code && <h1 className="text-white text-7xl font-bold text-center" onClick={() => { setShowCode((prev => !prev)) }}>{showCode ? code : "ShowCode"}</h1>}
		</div>
	);
})