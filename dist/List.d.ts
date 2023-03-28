export default List;
/**
 * The list with scrolling and a wrapper
 * @param {({
 *  children: [React.ReactNode] | React.ReactNode,
 *  className?: string,
 *  component?: string,
 *  label?: string,
 *  scrollBehavior?: "auto" | "smooth",
 *  stickyHeaders?: boolean,
 *  stickTo?: "all" | "bottom" | "top",
 * })} props
 *
 * @returns {React.ReactNode}
 */
declare function List({ children, className, component: Component, label, scrollBehavior, stickyHeaders, stickTo }: ({
    children: [React.ReactNode] | React.ReactNode;
    className?: string;
    component?: string;
    label?: string;
    scrollBehavior?: "auto" | "smooth";
    stickyHeaders?: boolean;
    stickTo?: "all" | "bottom" | "top";
})): React.ReactNode;
declare namespace List {
    namespace propTypes {
        const children: any;
        const className: any;
        const component: any;
        const label: any;
        const scrollBehavior: any;
        const stickyHeaders: any;
        const stickTo: any;
    }
    namespace defaultProps {
        const className_1: string;
        export { className_1 as className };
        const component_1: string;
        export { component_1 as component };
        const label_1: string;
        export { label_1 as label };
        const scrollBehavior_1: string;
        export { scrollBehavior_1 as scrollBehavior };
        const stickyHeaders_1: boolean;
        export { stickyHeaders_1 as stickyHeaders };
        const stickTo_1: string;
        export { stickTo_1 as stickTo };
    }
}
