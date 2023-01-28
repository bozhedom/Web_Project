import {useContext, useEffect, useState} from "react";
import {AppContext, AppContextProvider} from "../contexts/AppContext";
import {BottomNavigation, Box, Container, Grid} from "@mui/material";
import * as React from 'react';
import {NavBar} from "../pages/NavBar"
import {PairsInfo} from "../objects/PairsInfo";
import {parisRepository} from "../repositories/PairsRepository";
import {PairData} from "../objects/PairData";
import Typography from "@mui/material/Typography";

export const History = (props: any) => {

    const [records, setRecords] = useState<PairsInfo>();

    useEffect(() => {
        parisRepository.getPairsRecords().then((data) => {
            setRecords(data);
        });
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <Box>
                <Grid
                    margin="medium"
                    gap="small"
                >

                    {records?.list.map((record: PairData, index: number) => (
                        <>
                            <Typography component="h1" variant="h5" margin={1} padding={2}>
                                Номер: {index}
                            </Typography>
                            <Typography component="h4" variant="h6" margin={1} padding={2}>
                                Собеседник: {record.paireId}
                            </Typography>
                            <Typography component="h4" variant="h6" margin={1} padding={2}>
                                Название пары: {record.titlePare}
                            </Typography>
                        </>
                    ))}
                </Grid>
            </Box>

        </>
    )
}
