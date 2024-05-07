type InitialData = {
  pageNum?: number;
  pageSize?: number;
};

export const useLazyLoadList = (
  list: Ref<any[]>,
  reqListFn: () => Promise<any>,
  initialData?: InitialData
) => {
  const flags = reactive({
    loading: false,
    refreshing: false,
    finished: false,
    failed: false,
  });

  const pageNum = ref(initialData?.pageNum ?? 1);
  const pageSize = ref(initialData?.pageSize ?? 20);

  const onLoad = () => {
    pageNum.value++;
    getList();
  };

  const getList = async (isReset?: boolean) => {
    if (isReset) {
      flags.refreshing = true;
      pageNum.value = 1;
      list.value = [];
    }

    flags.loading = true;


    let isError = false;
    let isFinished = false;
    try {
      const [res] = await Promise.all([reqListFn(), $asyncDelay(200)])

      // const currRecords: any[] = res?.records || [];
      const currRecords: any[] = res?.ldata || []; // TODO 取出当前列表数据
      list.value = [...list.value, ...currRecords];

      const total = res?.total || 0; // TODO 总数没有?
      // const lastPageNum = Math.ceil(total / pageSize.value);
      const lastPageNum = 10; // TODO 暂时写死 10，接口末尾页码没有?
      if (pageNum.value >= lastPageNum) {
        isFinished = true;
      }
    } catch (e: any) {
      // NOTE 若 reqListFn 内，主动捕获了异常，需 手动再抛出一个异常，以便在此处理 后续的特定逻辑

      // console.log(e)
      isError = true;
    }

    flags.loading = false;
    flags.refreshing = false;
    flags.failed = isError;
    flags.finished = isFinished;
  };

  return {
    flags,
    pageNum,
    pageSize,

    getList,
    onLoad,
  };
};
