import {useEffect, useState} from "react";
import {Alert, AlertTitle} from "@mui/material";

/**
 * Alert bar content
 * @constructor
 */
function AlertBar() {
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {

        const alertStateMessageStorage = localStorage.getItem("alertStateMessage");
        setAlertMessage(alertStateMessageStorage ? alertStateMessageStorage : "");

    }, [alertMessage]);

    useEffect(() => {
        // window.location.reload();
    }, [localStorage.getItem("alertStateMessage")]);

    return(
        <div>
            {alertMessage && (
                <Alert severity="error">
                    <AlertTitle>Alert</AlertTitle>
                    <div>
                        {alertMessage} -
                        <strong> check it out!</strong>
                    </div>
                </Alert>
            )}
        </div>
    );
}
export default AlertBar;