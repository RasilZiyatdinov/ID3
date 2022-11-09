import React from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./styles.css";
import Mains from "./main";

const containerStyles = {
	width: "100vw",
	height: "100vh",
};

const renderForeignObjectNode = ({
	nodeDatum,
	toggleNode,
	foreignObjectProps,
}) => (
	<g>
		<circle className="circle" r={10}></circle>
		<foreignObject {...foreignObjectProps}>
			<div
				style={{
					wordWrap: "break-word",
					border: "5px solid white",
					backgroundColor: nodeDatum.isLeaf ? "darkgreen" : "darkblue",
				}}
			>
				<h3
					style={{
						textAlign: "center",
						color: "white",
						fontWeight: "bold",
						margin: "1em",
						fontSize: "14px",
					}}
				>
					{!nodeDatum.isLeaf ? "Классификатор: " + nodeDatum.className : ""}
					<br></br>Атрибут: {nodeDatum.attr}
					<br></br>Энтропия = {nodeDatum.entropy}
				</h3>
				<h3
					style={{
						textAlign: "center",
						color: "white",
						fontWeight: "normal",
						margin: "1em",
						fontSize: "12px",
					}}
				>
					Номера записей: {nodeDatum.idents.join()}
				</h3>
				{nodeDatum.isLeaf && (
					<button style={{ width: "100%" }}>{nodeDatum.result}</button>
				)}
			</div>
		</foreignObject>
	</g>
);

export default function App() {
	const [translate, containerRef] = useCenteredTree();

	const nodeSize = { x: 200, y: 200 };
	const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -100 };
	return (
		<div style={containerStyles} ref={containerRef}>
			<h3 style={{ textAlign: "center" }}>Алгоритм ID3</h3>
			<div>
				{Object.keys(Mains()[1]).map((item) => (
					<React.Fragment>
						<span style={{ fontSize: "12px", fontFamily: "Tahoma, sans-serif", fontWeight: "bold" }}>{item} =</span>
						{Mains()[1]
						[item].split(";")
							.map((str, i) => (
								<span style={{ fontSize: "10px", fontFamily: "Tahoma, sans-serif", display: "block" }}>
									&emsp;&emsp;{str}
								</span>
							))}
					</React.Fragment>
				))}
			</div>

			<Tree
				data={JSON.parse(Mains()[0])}
				translate={translate}
				nodeSize={nodeSize}
				renderCustomNodeElement={(rd3tProps) =>
					renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
				}
				orientation="vertical"
			/>
		</div>
	);
}
