export const Preview = ({ preview, index }) => {
	return (
		<li>
			<img src={preview} alt={`preview-${index}`} />
		</li>
	);
};