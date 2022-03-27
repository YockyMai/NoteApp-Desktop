export const initialNotes = (notesInfo:any) => ({
    type: "NOTES_INITIAL",
    payload: notesInfo
})

interface notesInfo {
    id: number,
    title : string,
    text : string,
    color : string
}
export const saveNote = (notesInfo:notesInfo) => {
    console.log(notesInfo);
    return {
        type: "SAVE_NOTE",
        payload: notesInfo
    }
}