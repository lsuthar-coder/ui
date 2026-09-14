import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import {
    makeStyles,
    useId,
    Body1,
    Button,
    Input,
    Label,
    Text,
} from "@fluentui/react-components";
import {CustomTable} from "../components/CustomTable";

export const EditTb = () => {
    const { id, index } = useParams();
    const state = useSelector((state) => state.tb.value);
    const data = state.find((item) => item.Id === id);
    const columns = [
        { columnKey: "lineNo", label: "Line no" },
        { columnKey: "account", label: "Account" },
        { columnKey: "debit", label: "Debit" },
        { columnKey: "credit", label: "Credit" },
    ]
    const [tabledata, setTabledata] = useState([]);

    useEffect(() => {
        if (data) {
            setTabledata(
                data.Entries.map((item, index) => ({
                    idx: { label: index + 1 },
                    lineNo: { label: index + 1 },
                    account: { label: item.Name },
                    debit: { label: item.Debit },
                    credit: { label: item.Credit }
                }))
            );
        }
    }, [data]);

    return <div>
        <Text>Trial Balance Details: TB - {index}</Text>
        <Text>Ref. No.</Text>
        <Input value={`TB-${index}`} disabled={true} />
        <CustomTable columns={columns} tabledata={tabledata} />
    </div>
}