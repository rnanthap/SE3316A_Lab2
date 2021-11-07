import React from "react";

//Creating a component for each cell
class Cell extends React.Component 
{
  render() 
  {
    return (
      <button
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}
      >____</button>
    );
  }
}

//Creating the component for the grid
export default class Board extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = 
    {
      player: "Red",
      cellSpaces: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
      gameOver: false,
      message: "",
    };
  }

  //Function to check if the player won
  checkWin() 
  {
    let spaces = this.state.cellSpaces;
    let horizontalCount = 0; // Checks horizontal win
    let verticalCount = 0; // Checks vertical win
    let emptyCellCount = 0; // Checks if all spaces are occupied
    let currentPlayer;

    //Checks to see if any cells are empty (null)
    for (let row = 0; row < 6; row++) 
    {
      for (let col = 0; col < 7; col++) 
      {
        //If the cell is null, then add it to the nullCount
        if (spaces[row][col] === null) 
        {
          emptyCellCount++;
        }
      }
    }

    //If there is no empty cells, the game is over and display the message
    if (emptyCellCount === 0) 
    {
      this.setState({
        gameOver: true,
        message: "Tie Game!",
      });
    }

    //Loop through the grid 
    for (let row = 0; row < 6; row++) 
    {
      for (let col = 0; col < 7; col++) 
      {
        //If the cells are empty
        if (spaces[row][col] === null) 
        {
          //There is no horoizontal count 
          horizontalCount = 0;
          currentPlayer = null;
        } 

        //If the cell is taken by the player
        else if (spaces[row][col] === currentPlayer) 
        {
          //Increase the horozontal count by 1
          horizontalCount++;
        } 

        //The current player takes the cell 
        else 
        {
          horizontalCount = 1;
          currentPlayer = spaces[row][col];
        }

        //If 4 horizontal cells together are taken by the player, then that player wins 
        if (horizontalCount >= 4) 
        {
          this.setState({ gameOver: true, message: currentPlayer + " Wins" });
        }
      }
    }

    //Loop through the grid
    for (let col = 0; col < 7; col++) 
    {
      for (let row = 0; row < 6; row++) 
      {
        //If the cells are empty
        if (spaces[row][col] === null) 
        {
          //There is no vertical count
          verticalCount = 0;
          currentPlayer = null;
        } 

        //If the cell is taken by the player
        else if (spaces[row][col] === currentPlayer) 
        {
          //Increase the vertical count by 1
          verticalCount++;
        } 

        //The current player takes the cell 
        else 
        {
          verticalCount = 1;
          currentPlayer = spaces[row][col];
        }

        //If 4 vertical cells together are taken by the player, then that player wins 
        if (verticalCount >= 4) 
        {
          this.setState({ gameOver: true, message: currentPlayer + " Wins" });
        }
      }
    }
  }

  //A function to render the cell buttons 
  //Renders 6 rows and 7 columns of cell buttons
  renderBoard() 
  {
    //Creating an empty array to store the cell buttons
    let cellButtons = [];

    //Creating cell buttons corresponding to the grid size
    for (let row = 0; row < 6; row++) 
    {
      for (let col = 0; col < 7; col++) 
      {
        //Add a cell button to the array
        cellButtons.push(
          <Cell
            //Location of the cell button 
            key={row + " " + col}

            //The cell button will be disabled when it is set to true or when the game is over
            disabled={false || this.state.gameOver} 

            //When clicking the button
            onClick={(e) => {
              //Set the colour to current player's colour
              e.target.style.backgroundColor = this.state.player;

              //The cell button is now disabled
              e.target.disabled = true;

              //Update the state of the gameSpaces
              let newGameSpaces = this.state.cellSpaces;
              newGameSpaces[row][col] = this.state.player;
              this.setState({ gameSpaces: newGameSpaces });

              //Check to see if the player won
              this.checkWin();

              //Change the current player to the other player
              this.setState({
                player: this.state.player === "Red" ? "Yellow" : "Red",
              });
            }}
          />
        );
      }

      //Add the cell button to the proper location
      cellButtons.push(<br key={row + "br"} />);
    }
    return cellButtons;
  }

  //Renders the template for the Connect 4 Game
  render() 
  {
    return (
      <div id="gameDiv" style={{justifyContent:'center', alignItems:'center', display: "flex", flexDirection: 'column', backgroundColor:"#87ceeb", height: '100vh'}}>
        <h1 style={{color: "red", textAlign: "center"}}>Connect 4 Game</h1>
        <div id="message">
          {this.state.gameOver
            ? this.state.message
            : this.state.player + "'s Turn"}
        </div>
        <div id="gridDiv">{this.renderBoard()}</div>
      </div>
    );
  }
}
