import {
  defineComponent,
  PropType,
  computed,
  onMounted,
  ref,
  reactive,
} from 'vue';
import { createNamespace } from '../../../utils/create';
import { TreeNode } from '../../tree/src/tree';

// 根据树的高度进行动态计算
export default defineComponent({
  name: 'z-virtual-list',
  props: {
    flatTree: {
      type: Array as PropType<TreeNode[]>,
      required: true,
    },
    remain: {
      type: Number as PropType<number>,
      default: 10,
    },
    size: {
      type: Number as PropType<number>,
      default: 30,
    },
  },
  setup(props, { slots }) {
    const bem = createNamespace('vl');
    const barRef = ref<HTMLElement>();
    const wrapperRef = ref<HTMLElement>();

    // 动态计算显示的区域
    const state = reactive({
      start: 0,
      end: props.remain,
    });

    // 计算卷去的高度
    const offset = ref(0);

    // 为了保证在数组的范围内, 取一个最小范围的值
    const prev = computed(() => {
      return Math.min(state.start, props.remain);
    });
    // 在剩下的 和原本默认展示的条数之间取最小值
    const next = computed(() => {
      return Math.min(props.remain, props.flatTree.length - state.end);
    });

    const visibleData = computed(() => {
      return props.flatTree.slice(
        state.start - prev.value, // 本来应该是 start - remain
        state.end + next.value, //           end + remain
      );
    });

    onMounted(() => {
      wrapperRef.value!.style.height = props.remain * props.size + 'px';
      barRef.value!.style.height = props.flatTree.length * props.size + 'px';
    });

    const handleScroll = () => {
      const scrollTop = wrapperRef.value?.scrollTop || 0;
      state.start = scrollTop / props.size;
      state.end = state.start + props.remain;
      offset.value = state.start * props.size - props.size * prev.value;
    };

    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          <div class={bem.e('scroll-bar')} ref={barRef}></div>
          <div
            class={bem.e('scroll-list')}
            style={{ transform: `translate3d(0, ${offset.value}px, 0)` }}>
            {visibleData.value.map((node) => {
              return slots.default && slots.default({ node });
            })}
          </div>
        </div>
      );
    };
  },
});
