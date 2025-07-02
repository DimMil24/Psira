import { Backdrop, CircularProgress } from "@mui/material";

const Loading = ({ loadingProp }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={loadingProp}
    >
      <CircularProgress size={80} color="inherit" />
    </Backdrop>
  );
};

export default Loading;
