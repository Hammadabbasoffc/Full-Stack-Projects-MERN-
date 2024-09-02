import { useInputValidation } from "6pp";
import { sampleUsers } from "../../constants/sampleData";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import { useLazySearchUserQuery } from "../../redux/api/api";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const dispatch = useDispatch();
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  const [users, setUsers] = useState(sampleUsers);
  const search = useInputValidation("");

  let isLoadingSendFriendRequest = false;
  const addFriendHandler = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>

        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => {
            return (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            );
          })}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
