export default ListItem;
/**
 * @param {({
 *  children?: [React.ReactNode] | React.ReactNode,
 *  className?: string,
 *  component?: string
 * })} props
 *
 * @returns {React.ReactNode}
 */
declare function ListItem({ children, className, component: Component }: ({
    children?: [React.ReactNode] | React.ReactNode;
    className?: string;
    component?: string;
})): React.ReactNode;
declare namespace ListItem {
    namespace propTypes {
        const children: any;
        const className: any;
        const component: any;
    }
    namespace defaultProps {
        const children_1: any[];
        export { children_1 as children };
        const className_1: string;
        export { className_1 as className };
        const component_1: string;
        export { component_1 as component };
    }
}
