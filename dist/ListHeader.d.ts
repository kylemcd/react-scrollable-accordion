export default ListHeader;
/**
 * ListHeader is an optionally sticky list element
 * @param {({
 *  children?: [React.ReactNode] | React.ReactNode,
 *  className?: string,
 *  component?: string,
 *  stickTo?: "all" | "bottom" | "top",
 * })} props
 *
 * @returns {React.ReactNode}
 */
declare function ListHeader({ addHeader, children, className, component: Component, getStickedHeadersTotalHeight, getTotalHeaders, index, listRef, stickTo }: ({
    children?: [React.ReactNode] | React.ReactNode;
    className?: string;
    component?: string;
    stickTo?: "all" | "bottom" | "top";
})): React.ReactNode;
declare namespace ListHeader {
    namespace propTypes {
        const addHeader: any;
        const children: any;
        const className: any;
        const component: any;
        const getStickedHeadersTotalHeight: any;
        const getTotalHeaders: any;
        const index: any;
        const listRef: any;
        const stickTo: any;
    }
    namespace defaultProps {
        export function addHeader_1(): void;
        export { addHeader_1 as addHeader };
        const children_1: any[];
        export { children_1 as children };
        const className_1: string;
        export { className_1 as className };
        const component_1: string;
        export { component_1 as component };
        export function getStickedHeadersTotalHeight_1(): void;
        export { getStickedHeadersTotalHeight_1 as getStickedHeadersTotalHeight };
        export function getTotalHeaders_1(): void;
        export { getTotalHeaders_1 as getTotalHeaders };
        const index_1: number;
        export { index_1 as index };
        const listRef_1: any;
        export { listRef_1 as listRef };
        const stickTo_1: string;
        export { stickTo_1 as stickTo };
    }
}
