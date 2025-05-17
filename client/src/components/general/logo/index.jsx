import LogoAsset from "../../../assets/logo.png";

const LogoComponent = ({ height = "100px", width = "100px" }) => {
  return <img src={LogoAsset} alt="" width={width} height={height} />;
};

export default LogoComponent;
