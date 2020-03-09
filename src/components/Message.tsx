import React, { FunctionComponent } from 'react'

export type MessageProps = {
    type?: string,
    message?: string,
    show?: boolean
}

export const Message:FunctionComponent<MessageProps> = (props) => {
    return(
        <>
            {props.show && (
                <div className={`alert alert-${props.type}`}>
                    {props.message}
                </div>
            )}
        </>
    )
}
