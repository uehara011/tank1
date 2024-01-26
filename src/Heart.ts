import { ref, onMounted, onBeforeUnmount } from 'vue';

export default function useHeart() {
  const showImages = ref([true, true, true, true, true, true]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const reversedImages = showImages.value.slice().reverse();
      const indexToHide = reversedImages.findIndex(image => image === true);

      if (indexToHide !== -1) {
        // 下から順に非表示にする
        showImages.value[showImages.value.length - 1 - indexToHide] = false;
      }
      console.log("removeHeart")
    }
  };

  onMounted(() => {
    // キーボード入力を検知
    window.addEventListener('keydown', handleKeyDown);
  });

  onBeforeUnmount(() => {
    // コンポーネントが破棄されるときにイベントリスナーも削除
    window.removeEventListener('keydown', handleKeyDown);
  });

  return { showImages };
}

/*
  const handleAction = () => {
    const indexToHide = showImages.value.findIndex(image => image === true);
    if (indexToHide !== -1) {
      // 下から順に非表示にする
      showImages.value[showImages.value.length - 1 - indexToHide] = false;
    }if(showImages.value.length==0) {
      const nextPageURL = `victory.html?`;
      window.location.href = nextPageURL;
    } else {
      
    }
    onMounted(() => {
      handleAction()
      return {showImages}
    });
  }
}
/*
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const reversedImages = showImages.value.slice().reverse();
      const indexToHide = reversedImages.findIndex(image => image === true);

      if (indexToHide !== -1) {
        // 下から順に非表示にする
        showImages.value[showImages.value.length - 1 - indexToHide] = false;
      }
      console.log("removeHeart")
    }
  };
  

  onMounted(() => {
    handleAction()
    return {showImages}
  });

  onBeforeUnmount(() => {
    // コンポーネントが破棄されるときにイベントリスナーも削除
    window.removeEventListener("keydown",d);
  });

  return { showImages };
}

export const useHeartSystem = () => {
  const hearts = ref(Array.from({ length: 10 }, (_, index) => ({ id: index })));

  const decreaseHP = () => {
    if (hearts.value.length > 0) {
      hearts.value.pop(); // 配列から最後のハートを削除
    }
  };

  return {
    hearts,
    decreaseHP,
  };
};
}
*/
