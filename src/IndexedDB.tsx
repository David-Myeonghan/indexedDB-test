import { useEffect } from "react";


const IndexedDB = () => {
    console.log('test')

    useEffect(() => {
        console.log('useEffect')
        return () => {
            console.log('clean up')
        }
    }, [])
    return 'test'
}

export default IndexedDB;