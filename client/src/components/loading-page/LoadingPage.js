import './loading-page.css'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingPage = ({show, text}) => {
    return (
        <div id="loading-page">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={show}
            >
                <div className="content">
                    <CircularProgress color="inherit" />
                    <strong>{' '}{text}</strong>
                </div>

            </Backdrop>
      </div>
    )
}

export default LoadingPage