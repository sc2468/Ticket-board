import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { CREATE_BOARD } from '../constances/gqlQueries';
import BoardContainer from './BoardContainer';
import { ORGANISATION_ID } from '../constances/staticData';
import DataInputComponent from '../components/DataInputComponent';
import { ticketItemsVar } from '../utilities/apolloClient';

function RootScreen() {
  // Test board
  //const [boardId,setboardId] = useState("5ed2c2cb-e8ae-4775-ae4a-ecf45907f38d");
  const [boardId,setboardId] = useState(undefined);
  const [createBoard, { data }] = useMutation(CREATE_BOARD);
  const createNewBoard = (name) => createBoard(
    { variables: { "organisationId": ORGANISATION_ID, 'input': { name }} }, 
  );
  // TODO must be a better way to set board id after to data changes
  if (data && data.putBoard && !boardId) {
    setboardId(data.putBoard.id);
    //need to clean ticket item var
    ticketItemsVar(undefined);
  }
  return (<React.Fragment>
    {!boardId && <DataInputComponent 
      submitData={createNewBoard} 
      buttonText="create new board" 
      placeholder="enter board name" 
    />}
    {boardId && <BoardContainer boardId={boardId} />}
    </React.Fragment>)
}

export default RootScreen;