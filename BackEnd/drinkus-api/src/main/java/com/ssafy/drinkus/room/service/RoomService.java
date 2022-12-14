package com.ssafy.drinkus.room.service;

import com.ssafy.drinkus.category.domain.Category;
import com.ssafy.drinkus.category.domain.CategoryRepository;
import com.ssafy.drinkus.category.query.CategoryQueryRepository;
import com.ssafy.drinkus.common.NotFoundException;
import com.ssafy.drinkus.common.NotMatchException;
import com.ssafy.drinkus.common.type.YN;
import com.ssafy.drinkus.room.domain.Room;
import com.ssafy.drinkus.room.domain.RoomRepository;
import com.ssafy.drinkus.room.query.RoomQueryRepository;
import com.ssafy.drinkus.room.request.RoomConnectRequest;
import com.ssafy.drinkus.room.request.RoomCreateRequest;
import com.ssafy.drinkus.room.request.RoomSearchRequest;
import com.ssafy.drinkus.room.request.RoomUpdateRequest;
import com.ssafy.drinkus.room.response.RoomInfoResponse;
import com.ssafy.drinkus.room.response.RoomListResponse;
import com.ssafy.drinkus.user.domain.User;
import com.ssafy.drinkus.user.domain.UserRepository;
import com.ssafy.drinkus.user.domain.UserSubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.drinkus.common.NotFoundException.*;
import static com.ssafy.drinkus.common.NotMatchException.USER_NOT_MATCH;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomQueryRepository roomQueryRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryQueryRepository categoryQueryRepository;
    private final UserSubCategoryRepository userSubCategoryRepository;
    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    //????????? ?????? ??????
    public RoomInfoResponse findByRoomId(Long roomId) {
        //???????????? ?????? ?????????????????? ???????????????
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));
        return RoomInfoResponse.from(room);
    }

    //????????? ????????? ?????? ??????
    public Page<RoomListResponse> findBySearchRequest(User user, RoomSearchRequest request, Pageable pageable) {
        Page<Room> findRoomList = roomQueryRepository.findBySearchCondition(request.getSearchKeyword(), request.getSameAge(), request.getSortOrder(), request.getCategoryId(), pageable, user);

        return findRoomList.map(RoomListResponse::from);
    }

    //????????? ?????? - ?????? ?????????
    public List<RoomListResponse> findBySameAges(User user) {
        // ?????? ??????
        StringBuilder sb = new StringBuilder(user.getUserBirthday());
        sb.insert(6, "-");
        sb.insert(4, "-");
        LocalDate birthday = LocalDate.parse(sb.toString());
        LocalDate today = LocalDate.now();
        int age = today.getYear() - birthday.getYear();

        // ?????? ???????????? ????????? ??? ??????
        List<Room> list;
        switch (age / 10) {
            case 2:
                list = roomRepository.findTop4ByAges20OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("?????? ???????????? ?????? ????????????."));
                break;
            case 3:
                list = roomRepository.findTop4ByAges30OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("?????? ???????????? ?????? ????????????."));
                break;
            case 4:
                list = roomRepository.findTop4ByAges40OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("?????? ???????????? ?????? ????????????."));
                break;
            case 5:
                list = roomRepository.findTop4ByAges50OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("?????? ???????????? ?????? ????????????."));
                break;
            case 6:
                list = roomRepository.findTop4ByAges60OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("?????? ???????????? ?????? ????????????."));
                break;
            default:
                list = roomRepository.findTop4ByAges70OrderByCreatedDateDesc(YN.Y).orElseThrow(() -> new NotFoundException("?????? ???????????? ?????? ????????????."));
                break;
        }
        List<RoomListResponse> response = new ArrayList<>();
        for (Room room : list) {
            RoomListResponse res = RoomListResponse.from(room);
            response.add(res);
        }
        return response;
    }

    //????????? ?????? - ??? ?????????
    public List<RoomListResponse> findRoomBySameCategory(User user) {
        if (userSubCategoryRepository.findByUser(user).isEmpty()) {
            return null;
        }

        Long findCategoryId = categoryQueryRepository.findCategoryIdByUserId(user.getUserId());
        Category findCategory = categoryRepository.findById(findCategoryId)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));

        List<Room> findRoomList = roomRepository.findTop4ByCategory(findCategory);
        return findRoomList.stream()
                .map(RoomListResponse::from)
                .collect(Collectors.toList());
    }

    //????????? ?????? - ?????? 12?????? ?????? ?????? ??? ??? ?????? 8???
    public List<RoomListResponse> findRandomRooms() {
        List<Room> currentRoomList = roomRepository.findAllByCreatedDateAfter(LocalDateTime.now().minusHours(12))
                .orElseThrow(() -> new NotFoundException(ROOM_NOT_FOUND));
        int size = currentRoomList.size() < 4 ? currentRoomList.size() : 4;

        Set<Room> roomSet = new HashSet<>();
        while (roomSet.size() < size) {
            int seq = (int) (Math.random() * size);
            roomSet.add(currentRoomList.get(seq));
        }

        List<RoomListResponse> response = new ArrayList<>();
        for (Room room : roomSet) {
            RoomListResponse res = RoomListResponse.from(room);
            response.add(res);
        }
        return response;
    }

    //????????? ??????
    @Transactional
    public Long createRoom(User user, RoomCreateRequest request) {
        Category findCategory = null;
        User findUser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        if (request.getCategoryId() != null) {
            findCategory = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
        } else {
            findCategory = null;
        }
        Room room = Room.createRoom(
                request.getRoomName(),
                findUser,
                request.getRoomPw().equals(null) || request.getRoomPw().equals("") ? null : passwordEncoder.encode(request.getRoomPw()),
                request.getPlaceTheme(),
                request.getPeopleLimit(),
                request.getAges(),
                findCategory
        );
        roomRepository.save(room);
        return room.getRoomId();
    }

    //????????? ??????
    @Transactional
    public void updateRoom(User user, Long roomId, RoomUpdateRequest request) {
        Category findCategory = null;
        Room findroom = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));

        if (request.getCategoryId() != null) {
            findCategory = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
        } else {
            findCategory = null;
        }
        if (!user.getUserId().equals(findroom.getUser().getUserId())) {
            throw new NotMatchException(USER_NOT_MATCH);
        }

        findroom.updateRoom(request.getRoomName(), request.getRoomPw(), request.getPeopleLimit(), request.getAges(), findCategory);
    }

    @Transactional
    //????????? ??????
    public void deleteRoom(User user, Long roomId) {
        Room findRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));
        if (!user.getUserId().equals(findRoom.getUser().getUserId())) {
            throw new NotMatchException(USER_NOT_MATCH);
        }
        roomRepository.deleteById(roomId);
    }

    @Transactional
    public void findById(RoomConnectRequest request) {
        Room findRoom = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.ROOM_NOT_FOUND));

        if (!passwordEncoder.matches(request.getRoomPw(), findRoom.getRoomPw())) {
            throw new NotMatchException(NotMatchException.PW_NOT_MATCH);
        }
    }
}
