$(document).ready(function() {
  let turn = 1
      count = 0
      gameOver = false
      player = 'first-player'
      totalPlayerOneWin = 0
      totalPlayerTwoWin = 0
  $('.index').on('click', function() {
    if (!gameOver) {
      let squareClass = $(this).attr('class')
      if ( squareClass.indexOf('checked') < 0) {
        $(this).addClass('checked')
      }
    }
  })
  $('#game li').click(function(){
    count++;
    if(turn === 1 && !$(this).hasClass('fa-times')) { 
      $('#turn').text('Player 2, make a move!') 
      $(this).addClass('fa fa-circle-o first-player disable')  
      $(this).text('')
      turn = 2        
      player = 'first-player'     
    } else if (!$(this).hasClass('fa-circle-o')) {     
      $('#turn').text('Player 1, make a move!') 
      $(this).addClass('fa fa-times second-player disable') 
      $(this).text('')
      turn = 1 
      player = 'second-player'
    }

    let checkedPosition = $(this).data('position')
        winFormula = [ 
                      [ 1, 2, 3 ], 
                      [ 1, 4, 7 ], 
                      [ 1, 5, 9 ],
                      [ 2, 5, 8 ], 
                      [ 3, 5, 7 ], 
                      [ 3, 6, 9 ], 
                      [ 4, 5, 6 ], 
                      [ 7, 8, 9 ] 
                    ]
    $.each(winFormula, function (key, checkedPositionIndex) {
      if ($.inArray(checkedPosition, checkedPositionIndex) >= 0) {
        let checkedPositionLength = 0
        $.each(checkedPositionIndex, function (index, value) {
          let indexClass = $('#index-' + value).attr('class')
          if (indexClass.indexOf(player) > 0) {
            checkedPositionLength = checkedPositionLength + 1
            if ( count < 9 ) {
              if (checkedPositionLength == checkedPositionIndex.length) {
                gameOver = true
                if (player === 'first-player') {
                  totalPlayerOneWin++
                  $('#o_win').text(totalPlayerOneWin)
                  status = 'The winner is Player 1!'
                } else {
                  totalPlayerTwoWin++
                  $('#x_win').text(totalPlayerTwoWin)
                  status = 'The winner is Player 2!'
                }
                $('.table-container').addClass('none')
                $('.game-over').removeClass('none')
                $('.game-over').text(status)
              }
            } else {
              gameOver = true
              $('.table-container').addClass('none')
              $('.game-over').removeClass('none')
              $('.game-over').text('It\'s a tie!')
            }
					}
        })
      }
    })
  })

  $("#reset").click(function () {
    $("#game li").text('');
    $("#game li").removeClass('fa fa-circle-o first-player disable')
    $("#game li").removeClass('fa fa-times second-player disable')
    $("#game li").removeClass('checked')
    $('.table-container').removeClass('none')
    $('.game-over').addClass('none')
    count = 0
    gameOver = false
    turn = 1
    player = 'first-player'
    $('#turn').text('Player 1, make a move!') 
  });
});
