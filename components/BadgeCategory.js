import { Badge } from "./ui/badge";

const badgeLabel={
    design:"Design",
    construction:"Construction",
    campus:"Campus",
    career:"career"
}

const variant={
    design:"design",
    construction:"construction",
    campus:"campus",
    career:"career"
}

export default function BadgeCategory({label,className}){


    return <Badge variant={variant[label]} className={className}>
            {badgeLabel[label]}
        </Badge>
}

