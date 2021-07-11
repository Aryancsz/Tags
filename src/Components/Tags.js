// using redux store is optional this can be implimented using react state management

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Tags = () => {
  const dispatch = useDispatch();
  // loading tag datat from store
  const tagsAdded = useSelector((state) => state.textReducers);

  // if tag is already added to field, here we are removing the duplicate by a function
  let NoRepeatTags = tagsAdded.text.filter(function (item, pos) {
    return tagsAdded.text.indexOf(item) === pos;
  });

  //Setting search text data to state hook
  const [searchText, setSearchText] = useState("");
  //Setting suggestions text data to state hook
  const [sugList, setSugList] = useState([]);

  // after inserting a text setting keys space plus and enter key to load the tag to store
  const pressToAdd = (e) => {
    if (e.charCode === 32 || e.charCode === 43 || e.charCode === 13) {
      searchText.length > 1 && dispatch({ type: "TAGS", payload: searchText });
      // if tag is empty dont add a tag
      searchText.length > 1 &&
        // dispatch data to store
        dispatch({ type: "ADD_SUG", payload: searchText });
      // reset input field empty to enter new tag
      setSearchText("");
    }
  };

  // if the text searched is present in the store it in the store to view

  const textSearched = (e) => {
    setSearchText(e?.target.value);
    let textEntered = e?.target.value;
    let addArr = [];
    if (textEntered) {
      addArr = tagsAdded.suggest.filter((el) => {
        return el
          .toString()
          .toLowerCase()
          .startsWith(textEntered.trim().toLocaleLowerCase());
      });
      setSugList(addArr);
    }
  };

  // when the cross mark is pressed icon must be deleted from view and also chech duplicates with function declared above and store the new tags in store
  const deleteTags = (e) => {
    let rel = NoRepeatTags.filter((el) => {
      return (
        e.target.parentElement.innerText.trim().toLowerCase() !==
        el.trim().toLowerCase()
      );
    });
    dispatch({ type: "REPLACE_TAGS", payload: rel });
  };

  //  if the suggestion is clicked add it as a tag in the field
  const suggestionClicked = (e) => {
    dispatch({
      type: "TAGS",
      payload: e.target.parentElement.innerText.trim().toLowerCase(),
    });
    setSearchText("");
  };

  // making a jsx out of tags from store to make many suggestion tags
  const suggestions = sugList.map((el) => {
    // empty tag is not valid
    if (searchText === " ") {
      return null;
    }
    // if there is string make ajax to show
    if (searchText.length) {
      return (
        <div key={uuidv4()} id='wrapper-tag'>
          <div className='sug-list' onClick={suggestionClicked}>
            <div className='sug-text'>
              {el}
              {/* <span className='tiny-number'>4</span> */}
            </div>
          </div>
        </div>
      );
    }
    return null;
  });

  //  jsx to add tags to field
  const addToField = NoRepeatTags.map((el) => {
    return (
      <div key={uuidv4()} className='added-tags'>
        <span className='tag-span'>{el}</span>
        <i className='fas fa-times cross-icon' onClick={deleteTags}></i>
      </div>
    );
  });

  return (
    <div className='head'>
      <div className='container'>
        <div className='frame3'>
          <div className='frame1'>
            <div className='tags'>Tags</div>
            <div className='tags-2'>Select time for your event</div>
          </div>
          <div className='frame2'>
            <div className='add-tags'>
              {addToField}
              <input
                type='text'
                placeholder='Add tags'
                className='input-field'
                value={searchText.toLowerCase()}
                onChange={textSearched}
                onKeyPress={pressToAdd}
                id='myInput'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='sug-box'>{suggestions}</div>
    </div>
  );
};

export default Tags;
