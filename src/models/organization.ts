export type OrganizationType = {
    excerpt: string;
    fields: {
        slug: string;
    }
    frontmatter: {
        startdate: string;
        present: boolean;
        date: string;
        title: string;
        categories: string[];
        position: string;
        image: string;
    }
}