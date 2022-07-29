package com.ssafy.drinkus.dailyboard;

import com.ssafy.drinkus.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class DailyBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId; // 글 번호

    @ManyToOne
    @JoinColumn(name = "creater_id")
    private User creater; // 작성자

    @ManyToOne
    @JoinColumn(name = "modifier_id")
    private User modifier; // 수정자

    private String boardContent; // 글 내용

    private Long parentId; // 원글 번호

    // 원글
    public static DailyBoard createDailyBoard(User creater, User modifier, String boardContent) {
        DailyBoard dailyBoard = new DailyBoard();

        dailyBoard.creater = creater;
        dailyBoard.modifier = modifier;
        dailyBoard.boardContent = boardContent;

        return dailyBoard;
    }

    // 답글
    public static DailyBoard createDailyBoard(User creater, User modifier, String boardContent, Long parentId) {
        DailyBoard dailyBoard = new DailyBoard();

        dailyBoard.creater = creater;
        dailyBoard.modifier = modifier;
        dailyBoard.boardContent = boardContent;
        dailyBoard.parentId = parentId;

        return dailyBoard;
    }

    public void updateDailyBoard(User modifier, String boardContent){
        this.modifier = modifier;
        this.boardContent = boardContent;
    }
}
